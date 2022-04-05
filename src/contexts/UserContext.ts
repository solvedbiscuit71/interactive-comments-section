import * as React from 'react';
import { UserProps } from '../interfaces/DataProps';

const UserContext = React.createContext<UserProps>({
    image: { 
      png: "images/avatars/image-juliusomo.png",
      webp: "images/avatars/image-juliusomo.webp"
    },
    username: "juliusomo"
})

export default UserContext;