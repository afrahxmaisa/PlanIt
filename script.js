




writeRandomText = writeRandomText = function() {
    var items =  new Array();
    items[0] = "I trust my intuition to guide me and I will make good decisions." ;
    items[1] = "If you want something you’ve never had, go and do something youve never done.”";
    items[2] = "I understand my purpose and I know exactly how to accomplish it in the best way possible.";
    items[3] = "I am too busy working on my grass to notice if yours is greener";
    items[4] = "If I am irritated by every rub, how will I ever be polished?";
    items[5] = "I am only human and we all make mistakes.";
    items[6] = "I will focus on the important things, and let the rest go.";
    items[7] = "I am a beautiful person. I Matter. I am strong. I am genuine. I can do anything I put my mind to. Ive got this.";
    items[8] = "Success is not final, and failure is not fatal. Its the courage to persevere that counts in the end.";
    items[9] = "I choose healthy ways to deal with stress.";
    items[10] = "I am thankful for the great education I am fortunate enough to receive.";
    items[11] = "The most important thing in everything I do is to try my best.";
    items[12] = "Every day, I improve myself in some way.";
    items[13] = "I have an abundance of good things in my life.";
    items[14] = "I will get through this.";
    items[15] = "I am grateful for what I have.";
    items[16] = "I love and approve of myself.";
    items[17] = "I embrace my flaws.";
    items[18] = "I see perfection in both my flaws and my virtues.";
    items[19] = "My self-worth is not determined by any number on a scale.";
    items[20] = "I see my problems as opportunities to grow.";
    var rand;
    rand = Math.floor(Math.random()*items.length);
    document.write(items[rand]);
  }