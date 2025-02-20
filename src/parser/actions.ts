export function add_expr(data: any) {
  const left = parseInt(data[0].join(''), 10);
  const right = parseInt(data[2].join(''), 10);
  return left + right;
}

export function sub_expr(data: any) {
  const left = parseInt(data[0].join(''), 10);
  const right = parseInt(data[2].join(''), 10);
  return left - right;
}

