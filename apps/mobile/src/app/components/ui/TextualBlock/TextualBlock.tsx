import { View } from 'react-native'
import Reveal, { AnimationType } from '../Reveal/Reveal'
import Paragraph from '../Text/Paragraph'
import Surtitle from '../Text/Surtitle'
import Title from '../Text/Title'

export type TextualBlockProps = {
  surtitle?: string
  title: string
  description?: string
  animation?: AnimationType
}

export default function TextualBlock({
  surtitle,
  title,
  description,
  animation,
}: TextualBlockProps) {
  return (
    <View style={{ gap: 8 }}>
      {surtitle && (
        <Reveal animation={animation}>
          <Surtitle>{surtitle}</Surtitle>
        </Reveal>
      )}
      <Reveal animation={animation} delay={surtitle ? 50 : 0}>
        <Title>{title}</Title>
      </Reveal>
      {description && (
        <Reveal animation={animation} delay={100}>
          <Paragraph>{description}</Paragraph>
        </Reveal>
      )}
    </View>
  )
}
