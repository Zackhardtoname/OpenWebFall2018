# Rasa 实现原理

Rasa是近年来比较流行的开源对话AI框架，主要有Rasa NLU（natural language understanding）和Rasa Core组成。两者可独立使用，但此处我们探讨结合的用法，并将其分为4个步骤。

建立语感
----
第一步，我们提供一个大型语言文本（corpus）。Rasa通过类似机器学习中的embedding技术将文本(如10年的财经新闻)中大部分的词都转化成多维空间的向量（维度一般上百，图1为了展示使用了2维）。我可将此步理解为建立Rasa的语感。

![img](https://pic2.zhimg.com/80/1cd37c9bac3b7503801d5a812d1a1b01_hd.png)

图1：正立拇指为较相似，倒立为较不相似

理解语意
----
第二步，给Rasa提供一些语意训练材料（nlu data）。语意(intent)代表用户一句话的意图（如&quot;greet&quot;,&quot;goodbye&quot;，&quot;request\_upstream\_downstream&quot;，&quot;calculation&quot;，&quot;request\_weather\_information&quot;等），即用户一句话的意图或目的。同时每个意图需要12-20个训练材料（以句子为单位）。下图为request\_upstream\_downstream（调查上下游）的几个训练语句：

![1536801151752](C:\Users\Zack\AppData\Local\Temp\1536801151752.png)


图2： 训练语句例子

从用户语句中提炼具体信息要求Rasa识别实体（entity）。图2中高亮部分为实体，此处红色为company，而粉色为stream\_type。简单的来说，通过前期人工标注出句中的实体，当Rasa遇到训练材料中未出现的新句型时,在此可是&#39;阿里巴巴的下游公司有哪些,&#39;能通过句中同样/相似的词来推断出&#39;阿里巴巴&#39;是公司主体，而&#39;下游公司&#39;为stream\_type。当然，推断不一定会正确，主要靠训练材料和NER（Named-entity Recognition）的算法。目前本项目使用MITIE的NER算法。

学习技能
----
第三步，在技能领域（domain）中教Rasa各种行动（actions）。建立在nlu的基础上与Rasa对话要求其在得知用户的语意后知道该做什么。那么Rasa的反应/行动将由actions定义，actions也可以是任意的python脚本。如在得知用户的语意为greet后使它说出&#39;hi&#39;，或是使它根据读到的实体（如&#39;阿里巴巴&#39;，&#39;下游公司&#39;）读取数据库并即使反馈给用户。

![1536801441922](C:\Users\Zack\AppData\Local\Temp\1536801441922.png)


图3：技能领域中定义的技能（图中技能以对话为主，&#39;{}&#39;为从上文提取的变量）

场景对话
----
第四步，给Rasa编故事（story）使Rasa训练对话能力。故事能将用户的语意与Rasa因有的对应反应结合。同时因为人们的实际对话有上文记忆（context-aware），我们可以通过讲故事的方式教Rasa遇到各种各样的情景该如何处理。图4包括了两个故事，各自有自然对话的逻辑。当然，我们不需给每种场景提供故事，Rasa能通过结合，重造等方法来应对未见过的对话。下图中的例子（模拟父母与子女间对话）理应能使Rasa应对多种食物并进行好恶判断。

![1536801268544](C:\Users\Zack\AppData\Local\Temp\1536801268544.png)


图4：故事例子

以上即为简化后Rasa实现智能对话的原理。同时Rasa还有其他许多便捷的功能，如交互学习（interactive learning，即不需要事先写好故事），fallback(在对意图判读置信度低于每一百分比时采用特定行动应对，如使用seq2seq模型)等。我们可以看到即使Rasa为行业前沿的开源技术，其功能涉及到大量的人为设计与布局。我们期待未来Rasa的社区能提供更流畅简便的调用方法。

获取更多信息在 http://zackLight.com  
:+1: :sparkles: :camel:
:rocket: :metal: :tada:

### 图片来源

1. 图1： [https://www.zhihu.com/question/32275069/answer/109446135]

2. 图4： [http://rowl1ng.com/tech/chatbot.html](http://rowl1ng.com/tech/chatbot.html)