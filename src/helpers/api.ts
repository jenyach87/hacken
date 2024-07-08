export const API_URLS = {
  usd: (order: 'asc' | 'desc') => `${process.env.NEXT_PUBLIC_API_URL}?vs_currency=usd&order=market_cap_${order}&per_page=10&page=1&sparkline=false`,
  eur: (order: 'asc' | 'desc') => `${process.env.NEXT_PUBLIC_API_URL}?vs_currency=eur&order=market_cap_${order}&per_page=10&page=1&sparkline=false`,
  asc: (currency: 'usd' | 'eur', rang: 'desc' | 'asc') => `${process.env.NEXT_PUBLIC_API_URL}?vs_currency=${currency}&order=market_cap_${rang}&per_page=10&page=1&sparkline=false`,
  desc: (currency: 'usd' | 'eur', rang: 'desc' | 'asc') => `${process.env.NEXT_PUBLIC_API_URL}?vs_currency=${currency}&order=market_cap_${rang}&per_page=10&page=1&sparkline=false`
};
