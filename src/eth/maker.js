// TODO: Check if it creates web3 instance
import Maker from '@makerdao/dai';

export default async function createMaker(network = 'kovan') {
  return await Maker.create('browser', {});
}