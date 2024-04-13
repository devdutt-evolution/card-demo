'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { requestForToken, onMessageListener, init } from '@/utils/firebase';
import { Banner } from '@/components/Modal';
// import Transition from './Transition';

type NotificationBody = {
  title?: string;
  body?: string;
  url: string;
};

export default function NextProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState<NotificationBody>({
    title: '',
    body: '',
    url: '',
  });

  useEffect(() => {
    init().then(async () => {
      let [success, failed] = await requestForToken();
      if (success) {
        onMessageListener()
          .then((payload) => {
            setOpen(true);
            setObj({
              title: payload?.notification?.title,
              body: payload?.notification?.body,
              url: payload?.data?.url || '',
            });
          })
          .catch((err) => console.log('failed: ', err));
      }
    });
  });

  return (
    // <Transition>
    <SessionProvider>
      {open && (
        <Banner
          title={obj?.title}
          body={obj?.body}
          url={obj.url || ''}
          toggle={() => setOpen(!open)}
        />
      )}
      {children}
      <ProgressBar
        height='2px'
        color='#00875F'
        options={{ showSpinner: false }}
        shallowRouting
      />
    </SessionProvider>
    // </Transition>
  );
}
