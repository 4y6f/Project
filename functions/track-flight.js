export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { flightNumber } = await request.json();

    const apiKey = env.AVIATIONSTACK_KEY;
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;

    const apiResponse = await fetch(url);
    const data = await apiResponse.json();

    if (!data?.data || data.data.length === 0) {
      return new Response(JSON.stringify({ success: false }), {
        headers: { "Content-Type": "application/json" },
        status: 404
      });
    }

    const f = data.data[0];

    const message = `
Flight: ${f.flight.iata}
Airline: ${f.airline.name}
Status: ${f.flight_status}

From: ${f.departure.airport}
Scheduled Departure: ${f.departure.scheduled}

To: ${f.arrival.airport}
Scheduled Arrival: ${f.arrival.scheduled}
    `.trim();

    return new Response(JSON.stringify({ success: true, message }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
