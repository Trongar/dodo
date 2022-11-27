import PocketBase from 'pocketbase';

// you can place this helper in a separate file so that it can be reused
export async function initPocketBase(req:any, res:any) {
  const pb = new PocketBase('http://127.0.0.1:8090/');

  // load the store data from the request cookie string
  pb.authStore.loadFromCookie(req?.headers?.cookie || '');

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    res?.setHeader('set-cookie', pb.authStore.exportToCookie());
  });

  try {
      // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
      pb.authStore.isValid && await pb.collection('users').authRefresh();
  } catch (_) {
      // clear the auth store on failed refresh
      pb.authStore.clear();
  }

  return pb
}

// export async function getServerSideProps({ req, res }:{req:NextRequest, res:NextResponse}) {
//   const pb = await initPocketBase(req, res)

//   // fetch example records...
//   const result = await pb.collection('example').getList(1, 30);

//   return {
//     props: {
//       // ...
//     },
//   }
// }