import { cosmic } from './config'

export const getTargetAudiences = async () => {
  const targetAudiences = await cosmic.objects
    .find({ type: 'target-audiences' })
    .props('slug,title,metadata')
    .depth(1)
  return targetAudiences.objects
}
