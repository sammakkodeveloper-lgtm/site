async function loadPart(id, file, callback) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Cannot load ${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    if (callback && typeof callback === "function") {
      callback();
    }
  } catch (err) {
    console.error(err);
  }
}
loadPart("header", "/template/header.html");
loadPart("sidebar", "/template/sidebar.html", () => {
  (adsbygoogle = window.adsbygoogle || []).push({});
});
loadPart("footer", "/template/footer.html");

document.addEventListener('DOMContentLoaded', () => {
    const allGameLinks = document.querySelectorAll('.game-thum-link');

    allGameLinks.forEach(gameLink => {
        const largeThumbnail = gameLink.querySelector('.game-thum');
        const smallThumbnailContainers = gameLink.querySelectorAll('.game-thum-small'); 
        
        const defaultImageSrc = largeThumbnail ? largeThumbnail.dataset.defaultImage : null;

        if (smallThumbnailContainers.length > 0 && largeThumbnail && defaultImageSrc) {
            
            // largeThumbnailにデフォルト画像を設定する関数
            const setDefaultImage = () => {
                largeThumbnail.style.backgroundImage = `url('${defaultImageSrc}')`;
            };

            // 初期表示: デフォルト画像を設定
            setDefaultImage();
            smallThumbnailContainers.forEach(container => {
                
                // マウスオーバー時: ホバーした li の中の img の src を取得して切り替える
                container.addEventListener('mouseenter', (event) => {
                    // ホバーした li の中から img 要素を検索
                    const imgElement = event.currentTarget.querySelector('img'); 
                    if (imgElement) {
                        const newImageSrc = imgElement.src;
                        largeThumbnail.style.backgroundImage = `url('${newImageSrc}')`;
                    }
                });

                // マウスアウト時: デフォルト画像に戻す
                container.addEventListener('mouseleave', () => {
                    setDefaultImage();
                });
            });
        }
    });

    console.log("すべてのゲームサムネイルが初期化されました。");
});