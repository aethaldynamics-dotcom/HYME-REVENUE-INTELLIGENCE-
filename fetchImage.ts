async function run() {
  const res = await fetch('https://kopa.ai');
  const text = await res.text();
  const index = text.indexOf('Before');
  console.log(text.substring(index - 1000, index + 1000));
}
run();
