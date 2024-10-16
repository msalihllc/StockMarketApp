// Finnhub API keyini buraya ekledim
const apiKey = 'Api';  //  API anahtarı

// En popüler 20 hisse senedini gösterdiğimiz alan
const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NVDA', 'NFLX', 'BABA', 'V',
     'JPM', 'JNJ', 'WMT', 'DIS', 'MA', 'HD', 'PG', 'VZ', 'PFE', 'KO'];

// Hisse senedi verilerini Finnhub'dan çekmek için kullandığım fonksiyon
async function fetchStockData(symbol) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Tüm hisse senetlerini alıp küçük kartlarda gösterme fonksiyonu
async function displayStocks() {
    const container = document.querySelector('.small-card-container');
    container.innerHTML = ''; // Önce temizle

    for (let symbol of popularStocks) {
        const stockData = await fetchStockData(symbol);

        // Kartları oluştur
        const card = document.createElement('div');
        card.classList.add('small-card');
        card.innerHTML = `
            <strong>${symbol}</strong><br>
            <span>Fiyat: ${stockData.c}</span><br>
            <span>Yüksek: ${stockData.h}</span><br>
            <span>Düşük: ${stockData.l}</span>
        `;
        container.appendChild(card);
    }
}

// Sayfa yüklendiğinde hisse senetlerini göster
window.onload = displayStocks;
