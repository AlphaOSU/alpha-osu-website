import { Typography } from 'antd';
import { Container } from './styles';
import { i, l } from './tex';

const { Title, Link, Text, Paragraph } = Typography;

export function AboutCn() {
  return (
    <Container>
      <Typography>
        <Title level={1}>
          算法简介
        </Title>
        <Paragraph>
          AlphaOSU! 的算法分为两个部分：分数预测系统和 pass 概率预测系统（即进入 BP 榜的概率）。
        </Paragraph>
        <Title level={2}>
          分数预测系统
        </Title>
        <Paragraph>
          分数预测系统用于<Text strong>预测用户在一张谱面上的得分分布</Text>。
          AlphaOsu! 为每个用户赋予一个{i('d')}维的隐向量 {i('u\\in \\mathbb R^d')}，
          每张谱面赋予一个 {i('d')} 维的隐向量 {i('v\\in \\mathbb R^d')}，
          分别表示用户各个方面的实力和谱面各个方面的难度。在已知成绩{i('score')}的情况下，
          可以使用 <Link href="https://sifter.org/~simon/journal/20061211.html">Latent Factor Model</Link>
          来求解{i('u')} 和 {i('v')}，使得：
          {l('u^\\top W v=\\text{score}')}
          其中
          {i('W\\in\\mathbb R^{d\\times d}')}
        </Paragraph>
      </Typography>
    </Container>
  );
}
