import React from 'react';

export const SocketContext = React.createContext<any>(null);

// if (true) {
//     console.log('user email: ', res.user_email);
//     socket.emit('check team join', { teamId: 1, userId: res.user_email });
//     socket.on('check team join result', (res: any) => {
//         console.log(res);
//         if (res.result === ' true') {
//             console.log(true);
//         } else {
//             socket.emit('join team', { teamId: 1, userId: res.userId});
//         }
//     });
// }
