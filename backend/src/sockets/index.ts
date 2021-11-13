import { Namespace } from 'socket.io';
import teamInit from './team';

const socketInit = (namespace: Namespace): void => {
	teamInit(namespace);
};

export default socketInit;
