import { NextRequest, NextResponse } from "next/server";

type MetaCapiRequestBody = {
  eventName?: string;
  eventId?: string;
  sourceUrl?: string;
  testEventCode?: string;
};

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") || undefined;
}

export async function POST(request: NextRequest) {
  try {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      return NextResponse.json(
        {
          ok: false,
          error: "Variáveis META_PIXEL_ID ou META_CAPI_ACCESS_TOKEN não configuradas.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as MetaCapiRequestBody;

    const eventName = body.eventName || "Contact";
    const eventId = body.eventId || crypto.randomUUID();
    const eventSourceUrl =
      body.sourceUrl || request.headers.get("referer") || "https://www.unicer.com.br/";

    const fbp = request.cookies.get("_fbp")?.value;
    const fbc = request.cookies.get("_fbc")?.value;

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url: eventSourceUrl,
          user_data: {
            client_ip_address: getClientIp(request),
            client_user_agent: request.headers.get("user-agent") || undefined,
            fbp,
            fbc,
          },
        },
      ],
    };

    if (body.testEventCode) {
      payload.test_event_code = body.testEventCode;
    }

    const metaResponse = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(
        accessToken
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result = await metaResponse.json();

    if (!metaResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          eventId,
          result,
        },
        { status: metaResponse.status }
      );
    }

    return NextResponse.json({
      ok: true,
      eventId,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Erro desconhecido.",
      },
      { status: 500 }
    );
  }
}
