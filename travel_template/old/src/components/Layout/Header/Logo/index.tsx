import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo.svg"
        alt="logo"
        width={140}
        height={30}
        priority
      />
    </Link>
  );
};

export default Logo;
