### BMI計算機
練習localStorage及一些基本DOM操作

[github page demo](https://loking23.github.io/BMI-Calculator/)

[設計稿標示](https://hexschool.github.io/JavaScript_HomeWork/)

隨手記:
+ input要辨別數字
+ 動態加入class
+ BMI刪除
+ reset鍵

#### 微心得：
這次花的時間比預計的還要多了，全部大概花了快8小時才完成，大概1/3的時間在寫css，2/3的時間在寫js，主要還是對於js的DOM不夠瞭解，這次有比較清楚node的運作是怎樣，還有關於getElement的運用，使用到取消冒泡。

這次釐清的點：
1. childNodes陣列包含textNode和ElementNode，可以透過像是appendChild()掛後面、replaceChild()替換，replaceChild()搞得比較久，不太知道舊的Node要怎麼表示，可以使用 document.querySelector('something').childNode[num]找到該節點

2. new Date()物件，大概可以簡單取個值，set個時間，以後要加減乘除再來研究

#### 疑惑點：
1. 關於JavaScript選取DOM到底需不需要專門為此設立一個class，還是id跟class選擇器並用呢？
如果按照Bootstrap的寫法不就分不出每個區塊之間的差別？
2. 如果有很多頁面，JavaScript該怎麼管理
