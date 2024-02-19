import profilePic from '@/ui/image/kayou.webp';
import logoPic from '@/ui/image/banner.webp';

export const AUTHOR = {
    link: 'https://github.com/kayoUwU',
    name: 'Kayou',
    icon: profilePic
}

export const LOGO = logoPic;

export const BASE_PATH = process?.env?.NEXT_PUBLIC_BASE_PATH || '';
export const SITE_BASE_URL = process?.env?.NEXT_PUBLIC_SITE_BASE_URL || ''; 