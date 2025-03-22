// src/(auth)/(center)/sign-in/page.tsx
import { getI18nPath } from '@/lib/helper';
import { SignIn } from '@clerk/nextjs';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ISignInPageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: ISignInPageProps) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'SignIn' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignInPage({ params }: ISignInPageProps) {
  const { locale } = params;
  setRequestLocale(locale);

  return (
    <div className="mt-10 md:mt-20">
        <SignIn  />
    </div>
  );
}