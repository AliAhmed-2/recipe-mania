export interface HeadingProps {
  content: string;
  type: 'section' | 'page' | 'recipe' | 'main';
  className?: string;
  id?: string;
}
