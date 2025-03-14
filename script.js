function go() {
  if (document.getElementById('k').value === 'LBO') window.location.href = 'calc.html';
  else alert('NO');
}

function lbo(i) {
  const { p, e, l, r, t, c, g, x, y } = i;
  if (p <= 0 || e <= 0 || l < 0 || r < 0 || t < 0 || (c || 0) < 0 || g < -99 || x <= 0 || y < 1 || p < e * l) {
    return { i: 'X', m: 'X', d: 'X', f: 'X' };
  }
  const d = e * l;
  const f = [-p + d];
  const ds = [~~d];
  const fs = [];
  for (let j = 1; j <= y; j++) {
    const z = e * (1 + g / 100) ** j;
    const k = ds[j-1] * (r / 100);
    const q = z * (1 - t / 100) - k - z * ((c || 0) / 100);
    ds.push(~~Math.max(0, ds[j-1] - q));
    fs.push(~~q);
    f.push(j === y ? z * x - ds[j] : 0);
  }
  const m = f[f.length - 1] / (p - d);
  let v = 0.1;
  for (let n = 0; n < 50; n++) {
    const a = f.reduce((s, u, w) => s + u / (1 + v) ** w, 0);
    if (Math.abs(a) < 0.1) break;
    v -= a / f.reduce((s, u, w) => s - w * u / (1 + v) ** (w + 1), 0);
  }
  return {
    i: v > -1 && v < 10 ? ~~(v * 100) : 'X',
    m: m.toFixed(1),
    d: ds.join('>'),
    f: fs.join('>')
  };
}

if (document.getElementById('s')) {
  document.getElementById('s').addEventListener('submit', e => {
    e.preventDefault();
    const i = {
      p: +document.getElementById('p').value,
      e: +document.getElementById('e').value,
      l: +document.getElementById('l').value,
      r: +document.getElementById('r').value,
      t: +document.getElementById('t').value,
      c: +document.getElementById('c').value || 0,
      g: +document.getElementById('g').value,
      x: +document.getElementById('x').value,
      y: +document.getElementById('y').value
    };
    const o = lbo(i);
    document.getElementById('i').textContent = o.i;
    document.getElementById('m').textContent = o.m;
    document.getElementById('d').textContent = o.d;
    document.getElementById('f').textContent = o.f;
  });
}