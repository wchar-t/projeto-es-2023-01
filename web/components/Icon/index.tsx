interface IconOptions {
  name: string,
  family?: 'classic' | 'sharp',
  type?: 'solid' | 'regular' | 'light' | 'thin' | 'duotone',
}

export default function Icon({
  name, family = 'classic', type = 'solid',
}: IconOptions) {
  const faFamily = family === 'sharp' ? ' fa-sharp' : '';

  return <i className={`fa-${type} fa-${name}${faFamily}`}> </i>;
}
