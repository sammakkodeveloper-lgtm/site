jQuery(function() {
  var appear = false;
  var pagetop = $('#page_top');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {  //100pxスクロールしたら
      if (appear == false) {
        appear = true;
        pagetop.stop().animate({
          'right': '10px' //右から0pxの位置に
        }, 300); //0.3秒かけて現れる
      }
    } else {
      if (appear) {
        appear = false;
        pagetop.stop().animate({
          'right': '-50px' //右から-50pxの位置に
        }, 300); //0.3秒かけて隠れる
      }
    }
  });
  pagetop.click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500); //0.5秒かけてトップへ戻る
    return false;
  });
});
document.addEventListener('DOMContentLoaded', () => {
    // ページ内のすべてのゲームリンクコンテナを取得
    const allGameLinks = document.querySelectorAll('.game-thum-link');

    // 取得した各コンテナに対して処理を実行
    allGameLinks.forEach(gameLink => {
        // 🚀 ループ内で、現在のコンテナ内（gameLink）から要素を検索
        const largeThumbnail = gameLink.querySelector('.game-thum');
        const smallThumbnails = gameLink.querySelectorAll('.game-thum-small img');

        if (smallThumbnails.length > 0 && largeThumbnail) {
            
            // largeThumbnailに初期画像を設定する関数 (現在のコンテナ専用)
            const setInitialImage = () => {
                // 最初の小さいサムネイルの画像を取得
                const initialImageSrc = smallThumbnails[0].src; 
                if (initialImageSrc) {
                    // 初期画像を largeThumbnail の背景に設定
                    largeThumbnail.style.backgroundImage = `url('${initialImageSrc}')`;
                }
            };

            setInitialImage();

            // 小さいサムネイル全てにイベントリスナーを設定 (現在のコンテナ専用)
            smallThumbnails.forEach(img => {
                // マウスオーバー時
                img.addEventListener('mouseenter', (event) => {
                    const newImageSrc = event.target.src;
                    // イベントが発生したコンテナ内の largeThumbnail にのみ適用
                    largeThumbnail.style.backgroundImage = `url('${newImageSrc}')`;
                });
            });
        }
    });

    console.log("すべてのゲームサムネイルが初期化されました。");
});