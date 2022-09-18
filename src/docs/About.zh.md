# 算法简介


AlphaOSU! 的算法分为两个部分：分数预测系统和 pass 概率预测系统（即进入 BP 榜的概率）。

## 分数预测系统


分数预测系统用于**预测用户在一张谱面上的得分分布**。AlphaOsu! 为每个用户赋予一个 $d$ 维的隐向量 $u\in \mathbb R^d$，每张谱面赋予一个 $d$ 维的隐向量 $v\in \mathbb R^d$，分别表示用户各个方面的实力和谱面各个方面的难度。在已知成绩 $\text{score}$ 的情况下，可以使用 [Latent Factor Model](https://sifter.org/~simon/journal/20061211.html) 来求解 $u$ 和 $v$，使得：
$$
u^\top W v=\text{score}
$$
其中 $W\in\mathbb R^{d\times d}$ 表示上下文矩阵。在 AlphaOsu! 中，矩阵 $W$ 为所开的游戏 mod，每个 mod 分别对应一个矩阵，如 $W_{\text{HT}}$，$W_{\text{NM}}$ 和 $W_{\text{DT}}$ 等。
