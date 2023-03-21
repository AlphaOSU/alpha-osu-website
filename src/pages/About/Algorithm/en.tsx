/* eslint-disable max-len,react/no-unescaped-entities */
import { Typography } from 'antd';
import { i, l } from './tex';

const { Title, Link, Text, Paragraph } = Typography;

export function AboutEn() {
  return (
    <Typography>
      <Title level={2}>
        FAQ
      </Title>
      <Title level={4}>
        Q: What is AlphaOsu?
      </Title>
      <Paragraph>
        Inspired by <Link href="https://www.deepmind.com/research/highlighted-research/alphago" target="_blank">AlphaGo</Link> and <Link href="https://www.nature.com/articles/s41586-021-03819-2" target="_blank">AlphaFold</Link>, AlphaOsu! aims to use AI technology to mine the big data in the osu! game, and spawning a series of applications to benefit players and the community, including a PP beatmap recommender system, mining player's potential improvement, player/beatmap similarity analysis, beatmap difficulty estimation etc. Currently, only the osu!mania and the osu!standard mode is supported, and the support for the rest of modes is under development.
      </Paragraph>

      <Title level={4}>
        Q: Why can't I sign in?
      </Title>
      <Paragraph>
        Due to the limit of the osu! website, currently only the global 4-digit players (osu!mania mode) and the top 10,000 players in the CN region are supported to query. We will support the remaining modes and lower ranked players in the future.
      </Paragraph>

      <Title level={4}>
        Q: The beatmaps recommended to me are too difficult, I can't pass!
      </Title>
      <Paragraph>
        Please try to increase the BP probability filter. The BP probability can be understood as the pass probability, so the recommended beatmaps after increasing will be more likely to pass.
      </Paragraph>

      <Title level={4}>
        Q: How frequent is the website data updated?
      </Title>
      <Paragraph>
        Currently, we update the data every three days. When updating, you will be notified in the <Link href="https: //discord.gg/H5VzJxeK4F" target="_blank">discord</Link> and <Link href="https://jq.qq.com/?_wv=1027&k=uJ8Hv4Ss" target="_blank">QQ group</Link>.
      </Paragraph>

      <Title level={4}>
        Q: Why are some predicted scores lower than the real scores? And when it is low, there is still a PP increase?
      </Title>
      <Paragraph>
        Generally speaking, the algorithm will predict half of the scores higher (which have more potential for improvement), and half of the scores will be predicted lower (indicating that they have performed well before). At the same time, we will calculate the increment in total PP for <strong>record breaking cases</strong>, not the increment in total PP for predicted scores. This is to ensure the stability of the recommendation results, so that beatmaps with low predicted scores can also be recommended.
      </Paragraph>

      <Title level={4}>
        Q: The predicted score is inaccurate / the BP probability is inaccurate / ...?
      </Title>
      <Paragraph>
        We will continue to improve the algorithm. If you have any ideas or questions, please join our <Link href="https ://discord.gg/H5VzJxeK4F" target="_blank">discord</Link> or <Link href="https://jq.qq.com/?_wv=1027&k=uJ8Hv4Ss" target="_blank">QQ group</Link>.
      </Paragraph>

      <Title level={2}>
        Introduction to Algorithms
      </Title>

      <Title level={3}>
        Predict the playing scores
      </Title>
      <Paragraph>
        Score prediction system is used for <Text strong>estimating the player's score distribution on a beatmap.</Text> AlphaOsu! assigns a {i('d')}-dimensional latent vector {i('u\\in \\mathbb R^d')} to each player, and assigns a {i('d')}-dimensional latent vector {i('v\\in \\mathbb R^d')} to each beatmap, encoding the strength of all aspects of the player and the difficulty of all aspects of the beatmap, respectively. Given a known {i('\\text{score}')}, we can leverage <Link href="https://sifter.org/~simon/journal/20061211.html" target="_blank">Latent Factor Model</Link> to solve {i('u')} and {i('v')}, making:
        {l('u^\\top W v=\\text{score},')} where {i('W\\in\\mathbb R^{d\\times d}')} is a {i('d\\times d')} diagonal matrix representing a context matrix. In AlphaOsu!, context matrix is defined to be the game mod. Each mod corresponds to a matrix, for example, {i('W_{\\text{HT}}')}, {i('W_{\\text{NM}}')} and {i('W_{\\text{DT}}')}.
      </Paragraph>
      <Paragraph>
        To speed up the convergence, AlphaOsu! leverages <Link href="https://www.jmlr.org/papers/volume16/hastie15a/hastie15a.pdf" target="_blank">Alternating Least Squares</Link> to optimize {i('u')}, {i('v')} and {i('W')}, i.e., fix two of the variables to optimize the third variable, and use the Least Squares method to optimize the third variable. Repeat this process to optimize {i('u')}, {i('v')} and {i('W')} respectively until the algorithm converges.
      </Paragraph>


      <Title level={3}>
        Predict the score fluctuations
      </Title>
      <Paragraph>
        Let {i('\\hat s=u^\\top W v')} denote the predicted score. Actually, rather than predicting a single score on a beatmap, we are more interested in predicting the <Text strong>score distribution</Text> of players on this beatmap. This is because players' scores tend to fluctuate, and playing the same beatmap several times often results in different scores. In order to predict the distribution, ordinary Least Squares can be replaced by Bayesian Least Squares (i.e., <Link href="https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.27.9072&rep=rep1&type=pdf" target="_blank">Bayesian Ridge Regression</Link>). Bayesian Ridge Regression allows us to obtain a Bayesian model that eventually estimates a Gaussian distribution to represent the distribution of scores, namely:
        {l('\\text{score}\\sim \\mathcal N(\\cdot\\mid\\hat s, \\hat\\sigma^2),')}
        where {i('\\hat\\sigma^2')} is the variance of scores predicted by Bayesian Ridge Regression for input vectors {i('u')}, {i('v')} and matrix {i('W')}. Using this distribution, we can predict the player's <Text strong>record-breaking probability</Text> given that the player's true score is {i('s_0')}:
        {l('P(\\text{score}>s_0)=\\int_{s=s_0}^{\\infty}\\mathcal N(s\\mid \\hat s, \\hat\\sigma^2) \\text{d}s')}
      </Paragraph>

      <Title level={3}>
        Predicted the average PP increment
      </Title>
      <Paragraph>
        In order to predict the PP improvement a player can get on a beatmap, one can directly calculate the PP corresponding to the score {i('\\hat s')}, and then calculate how much the total PP can improve. However, this approach will always result in a total PP increment of 0 when {i('\\hat s')} is less than the true score, even if the difference is small. This is not conducive to the stability of the recommender system. Therefore, given that we can estimate the distribution of player scores, it is straightforward to estimate the average single PP in the record-breaking situation:
        {l('\\mathbb E_{s|s>x_0}[\\text{pp}(s)]=\\frac{\\int_{s=s_0}^{\\infty}\\text{pp}(s)\\mathcal N(s\\mid \\hat s, \\hat\\sigma^2)  \\text{d}s}{\\int_{s=s_0}^{\\infty}\\mathcal N(s\\mid \\hat s, \\hat\\sigma^2) \\text{d}s},')}
        where {i('\\text{pp}(s)')} is the PP corresponding to the score {i('s')}. Therefore, the average PP that can be obtained when passing is:
        {l('\\mathbb E_{s}[\\text{pp}(s)]=\\mathbb E_{s|s>x_0}[\\text{pp}(s)]\\cdot P(s>s_0)=\\int_{s=s_0}^{\\infty}\\text{pp}(s)\\mathcal N(s\\mid \\hat s, \\hat\\sigma^2)  \\text{d}s')}
      </Paragraph>

      <Title level={3}>
        Predict the passing probability
      </Title>
      <Paragraph>
        Predicting the average pp alone is not sufficient, because the chances of player passes are also smaller for a highly difficult beatmap. However, only data on passing (positive sample) can be collected, and data on non-passing (negative sample) are missing. For the missing data, it is difficult to determine whether it is because the player did not visit the beatmap, or because the player could not pass. Also, the number of missing is generally much larger than the number of positive samples, resulting in an unbalanced sample problem. To obtain negative samples, AlphaOsu! first makes the assumption that if a beatmap has a predicted score {i('\\hat s')} sufficient to make it to the player's BP list, but the player does not have its score, it means that the player could not pass on this beatmap. Using this assumption, high quality negative samples (pp high enough) can be sampled for each player.
      </Paragraph>
      <Paragraph>
        AlphaOsu! uses <Link href="https://arxiv.org/pdf/1603.02754.pdf" target="_blank">XGBoost</Link> as the passing probability prediction model. The input features include the player vector {i('u')}, the beatmap vector {i('v')}, the mod, and some features of the beatmap: difficulty stars, length, amount of objects, pass rate, play counts, etc.
      </Paragraph>
      <Paragraph>
        It is worth mentioning the number of play counts (PC). For some new beatmap, the number of PC tends to be low and the number of entries into the BP is low, leading to a low predicted pass probability. This problem is similar to the recommender system's (<Link href="https://www.cs.cornell.edu/people/tj/publications/joachims_etal_05a.pdf" target="_blank">position bias</Link>) problem. To solve this problem, PC can be used as one of the input features of the model during training. When predicting, for new beatmap (with low PC), increase its PC to a threshold value, thus correcting for this bias.
      </Paragraph>

      <Title level={3}>
        Potential PP increment
      </Title>
      <Paragraph>
        Potential PP increment is defined as the pass probability multiplied by the PP increment. It measures the potential of a beatmap to farm PP.
      </Paragraph>

      <Title level={2}>
        Other application
      </Title>
      <Title level={3}>
        User similarity
      </Title>
      <Paragraph>
        The multidimensional strength of each aspect of the players is modeled as the vector  {i('u')}. Thus, the similarity of two players can be calculated using the Euclidean distance of the vectors:
        {l('\\text{similarity}(u_1, u_2)=-||u_1-u_2||_2')}
      </Paragraph>

      <Title level={3}>
        Others
      </Title>
      <Paragraph>
        To be continue...
      </Paragraph>

    </Typography>
  );
}
