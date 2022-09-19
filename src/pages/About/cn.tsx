import { Typography } from 'antd';
import { Container } from './styles';
import { i, l } from './tex';

const { Title, Link, Text, Paragraph } = Typography;

export function AboutCn() {
  return (
    <Container>
      <Typography>
        <Title level={1}>
          AlphaOsu!
        </Title>
        <Paragraph>
          AlphaOsu! 的命名灵感来自于 <Link href='https://baike.baidu.com/item/%E9%98%BF%E5%B0%94%E6%B3%95%E5%9B%B4%E6%A3%8B/19319610' target='_blank'>AlphaGo</Link> 和 <Link href='https://www.nature.com/articles/s41586-021-03819-2' target='_blank'>AlphaFold</Link>，
          旨在使用人工智能技术挖掘 osu! 游戏内的大数据，从而催生一系列应用以帮助玩家乃至社区的发展，
          包括 PP 图推荐系统、玩家提升潜力挖掘、玩家 / 谱面相似度分析、谱面难度推断等。目前暂时仅支持 osu!mania 模式，其余模式的支持正火热开发中。
        </Paragraph>

        <Title level={2}>
          算法简介
        </Title>

        <Title level={3}>
          预测游玩分数
        </Title>
        <Paragraph>
          分数预测系统用于<Text strong>预测玩家在一张谱面上的得分分布</Text>。AlphaOsu! 为每个玩家赋予一个 {i('d')} 维的隐向量 {i('u\\in \\mathbb R^d')}，每张谱面赋予一个 {i('d')} 维的隐向量 {i('v\\in \\mathbb R^d')}，分别表示玩家各个方面的实力和谱面各个方面的难度。在已知成绩 {i('\\text{score}')} 的情况下，可以使用 <Link href='https://sifter.org/~simon/journal/20061211.html' target='_blank'>Latent Factor Model</Link> 来求解{i('u')} 和 {i('v')}，使得：
          {l('u^\\top W v=\\text{score}')}
          其中 {i('W\\in\\mathbb R^{d\\times d}')} 是一个 {i('d\\times d')} 对角矩阵，表示上下文矩阵。在 AlphaOsu! 中，上下文 {i('W')} 定义为所开的游戏 mod，每个 mod 分别对应一个矩阵，如 {i('W_{\\text{HT}}')}，{i('W_{\\text{NM}}')} 和 {i('W_{\\text{DT}}')} 等。
        </Paragraph>
        <Paragraph>
          为了加速算法收敛，AlphaOsu! 使用<Link href='https://www.jmlr.org/papers/volume16/hastie15a/hastie15a.pdf' target='_blank'>交替最小二乘法</Link>来分别求解 {i('u')}、{i('v')} 和 {i('W')}，即：固定其中两个变量来优化第三个变量，利用最小二乘法来优化第三个变量。不断重复这个过程分别优化 {i('u')}, {i('v')} 和 {i('W')}，直至算法收敛。
        </Paragraph>


        <Title level={3}>
          预测成绩的波动
        </Title>
        <Paragraph>
          令预测的分数期望为 {i('\\hat s=u^\\top W v')}。事实上，比起预测玩家在一张图上的成绩，我们对预测玩家在这张图上的<Text strong>成绩分布</Text>更加感兴趣。这是因为玩家的成绩往往是波动的，连续几次游玩同一谱面往往会得到不一样的分数。为了预测分布，可以将普通的最小二乘法替换成贝叶斯最小二乘法（即<Link href='https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.27.9072&rep=rep1&type=pdf' target='_blank'>贝叶斯岭回归</Link>）来实现。贝叶斯岭回归允许我们获得一个贝叶斯模型，最终估计出一个正态分布来表示成绩的分布，即：
          {l('\\text{score}\\sim \\mathcal N(\\cdot\\mid\\hat s, \\hat\\sigma^2)')}
          其中方差 {i('\\hat\\sigma^2')} 是贝叶斯岭回归针对输入向量 {i('u')}、{i('v')} 和矩阵 {i('W')} 所预测的成绩波动方差。利用这个分布，在已知玩家的真实成绩为 {i('s_0')} 的情况下，我们可以预测玩家<Text strong>破纪录的概率</Text>：
          {l('P(\\text{score}>s_0)=\\int_{s=s_0}^{\\infty}\\mathcal N(s\\mid \\hat s, \\hat\\sigma^2) \\text{d}s')}
        </Paragraph>

        <Title level={3}>
          预测平均 PP 提升
        </Title>
        <Paragraph>
          为了预测玩家能在一张图上拿到的 PP 提升，可以直接计算分数 {i('\\hat s')} 所对应的 PP，然后计算总 PP 能提升多少。然而，这种做法会使得当 {i('\\hat s')} 小于真实分数的时候，总 PP 的提升始终为 0，即使 {i('\\hat s')} 仅仅比真实分数小了一点。这不利于推荐系统的稳定性。因此，考虑到我们能估计玩家成绩的分布，可以直接估计在破纪录情况下的平均单曲 PP：
          {l('\\mathbb E_{s|s>x_0}[\\text{pp}(s)]=\\frac{\\int_{s=s_0}^{\\infty}\\text{pp}(s)\\mathcal N(s\\mid \\hat s, \\hat\\sigma^2)  \\text{d}s}{\\int_{s=s_0}^{\\infty}\\mathcal N(s\\mid \\hat s, \\hat\\sigma^2) \\text{d}s},')}
          其中 {i('\\text{pp}(s)')} 表示分数 {i('s')} 对应的 PP。因此，该谱面在能存活的情况下，能获得的平均 PP 为：
          {l('\\mathbb E_{s}[\\text{pp}(s)]=\\mathbb E_{s|s>x_0}[\\text{pp}(s)]\\cdot P(s>s_0)=\\int_{s=s_0}^{\\infty}\\text{pp}(s)\\mathcal N(s\\mid \\hat s, \\hat\\sigma^2)  \\text{d}s')}
        </Paragraph>

        <Title level={3}>
          预测存活的概率
        </Title>
        <Paragraph>
          仅仅预测平均 pp 是不够的，因为对于难度过高的谱面，玩家存活的几率也会比较小。然而，只能收集到存活的数据（正样本），不能存活的数据（负样本）是缺失的。对于缺失的数据，很难判断是因为玩家没去游玩这个谱面，还是因为玩家无法在这个谱面上存活下来。
          同时，缺失的数目一般远大于正样本数目，导致样本不均衡。为了获得负样本，AlphaOsu! 首先做出了一个假设：如果一张图的预测得分 {i('\\hat s')} 足以使得它进入玩家的 BP 榜，但玩家却没有它的成绩，说明玩家无法在这张谱面上存活下来。
          利用这个假设，可以为每一个玩家采样出高质量的负样本（pp 足够高）。
        </Paragraph>
        <Paragraph>
          AlphaOsu! 使用 <Link href='https://arxiv.org/pdf/1603.02754.pdf' target='_blank'>XGBoost</Link> 作为存活概率预测模型。
          输入的特征包括玩家向量 {i('u')}、谱面向量 {i('v')}、所开 mod，以及谱面的一些公开特征：难度星级、长度、物量、通过率、游玩次数等。
        </Paragraph>
        <Paragraph>
          值得一提的是游玩次数。对于一些新图，游玩次数往往比较低，进入 BP 的数量也比较低，导致预测的存活概率也偏低。这一问题与推荐系统的位置偏差（<Link href='https://www.cs.cornell.edu/people/tj/publications/joachims_etal_05a.pdf' target='_blank'>position bias</Link>）问题类似。
          为了解决这一问题，可以在训练的时候将游玩次数作为模型的输入特征之一。预测时，对于新图（游玩次数较低的图），提升它的游玩次数到一个阈值，从而修正这一偏差。
        </Paragraph>

        <Title level={3}>
          PP 提升潜力
        </Title>
        <Paragraph>
          PP 提升期望定义为存活概率乘以 PP 提升大小。它可以衡量一张图能带来 PP 提升的潜力。
        </Paragraph>

        <Title level={2}>
          其他应用
        </Title>
        <Title level={3}>
          玩家实力相似度
        </Title>
        <Paragraph>
          玩家向量 {i('u')} 建模了玩家各个方面的多维实力。因此，两名玩家的相似度可以使用向量的欧氏距离来计算：
          {l('\\text{similarity}(u_1, u_2)=-||u_1-u_2||_2')}
        </Paragraph>

        <Title level={3}>
          其他
        </Title>
        <Paragraph>
          待开发...
        </Paragraph>

      </Typography>
    </Container>
  );
}
