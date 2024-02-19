import getConfig from 'next/config';
import profilePic from '@/ui/image/kayou.webp';

export const AUTHOR = {
    link: 'https://github.com/kayoUwU',
    name: 'Kayou',
    icon: profilePic
}

const { publicRuntimeConfig } = getConfig();
export const BASE_PATH = publicRuntimeConfig.BASE_PATH || '';