import { RawCode } from 'codehike/code'
import Pre from './Pre'
import CodeContainer from './CodeContainer'
import { meta } from './meta'
import { highlight } from './highlight'

export async function Code({
  codeblock,
}: {
  codeblock: RawCode
  isPanel?: boolean
}) {
  const highlighted = await highlight(codeblock)

  const { title } = meta(codeblock)

  const isPanel = !!title

  return (
    <CodeContainer>
      <Pre highlighted={highlighted} showPanel={isPanel} />
    </CodeContainer>
  )
}
