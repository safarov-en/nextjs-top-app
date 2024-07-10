import { getMenu } from "@/api/menu";

export default async function Home() {
  const menu = await getMenu(0)
  return (
    <div>
      <ul>
        {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
    </div>
  );
}

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
//   const firstCategory = 0
//   const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find')
//   return {
//     props: {
//       menu,
//       firstCategory
//     }
//   }
// }