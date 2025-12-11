export async function onRequest(context) {
  const flight = context.request.url.split("flight=")[1] || "";
  const apiKey = context.env.API_KEY;  // FIX: context.env not context.end

  if (!flight)
    return new Response("No flight provided.", { status: 400 });

  const url = "http://api.aviationstack.com/v1/flights";
  const params = new URLSearchParams({
    access_key: apiKey,
    flight_iata: flight
  });

  try {
    const res = await fetch(`${url}?${params.toString()}`);
    const data = await res.json();

    if (!data.data || !data.data.length)
      return new Response("Flight not found or not live.", { status: 404 });

    const f = data.data[0];

    const result =
      `${f.airline.name} flight ${f.flight.iata}\n` +
      `From: ${f.departure.airport} (${f.departure.iata})\n` +
      `To: ${f.arrival.airport} (${f.arrival.iata})\n` +
      `Status: ${f.live ? "In-Air" : f.flight_status}`;

    return new Response(result, {
      status: 200,
      headers: { "content-type": "text/plain" }
    });

  } catch (err) {
    return new Response("Error: " + err.toString(), { status: 500 });
  }
}
