import { cosmos, log } from '@graphprotocol/graph-ts'
import { Reward } from '../types/schema'

export function handleReward(eventData: cosmos.EventData): void {
  /*
    DEBUG
    */
  log.warning('{}', [eventData.event.eventType])
  log.warning('{} {}', [
    eventData.block.header.height.toString(),
    eventData.block.header.proposerAddress.toHexString(),
  ])
  log.warning('{}', [eventData.event.attributes.length.toString()])
  for (var i = 0; i < eventData.event.attributes.length; i++) {
    let att = eventData.event.attributes[i]
    log.warning('{} {} {}', [att.index.toString(), att.key, att.value])
  }

  //
  const height = eventData.block.header.height
  const validator = eventData.event.getAttributeValue("validator")
  const amount = eventData.event.getAttributeValue("amount")

  let reward = new Reward(`${height}-${validator}`)
  reward.validator = validator
  reward.amount = amount

  reward.save()
}
