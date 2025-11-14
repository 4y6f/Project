export async function onRequestPost(context) {
  const data = await context.request.json();
  const input = data.password;

  const correct = context.env.ACCESS_PASSWORD;

  if (input === correct) {
    return new Response(JSON.stringify({ ok: true }));
  }

  return new Response(JSON.stringify({ ok: false }), { status: 401 });
}
