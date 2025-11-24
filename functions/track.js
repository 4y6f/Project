export async function onRequest(context) {
  const url = "https://api.aviationstack.com/v1/flights";
  const params = new URLSearchParams({
    access_key: context.end.API_KEY
  });

  try {
    const res = await fetch(`${url}?${params.toString()}`);
    const data = await res.json();

    let output = [];

    if (Array.isArray(data.results)) {
      for (const flight of data.results) {
        if (!flight.live?.is_ground) {
          output.push(
            `${flight.airline?.name} flight ${flight.flight?.iata} from ` +
            `${flight.departure?.airport} (${flight.departure?.iata}) to ` +
            `${flight.arrival?.airport} (${flight.arrival?.iata}) is in the air.`
          );
        }
      }
    }

    return new Response(output.join("\n"), {
      status: 200,
      headers: { "content-type": "text/plain" }
    });

  } catch (err) {
    return new Response(`Error: ${err}`, { status: 500 });
  }
}
