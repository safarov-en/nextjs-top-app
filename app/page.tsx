import { Button } from "@/components/Button/Button";
import { Htag } from "@/components/Htag/Htag";

export default function Home() {
  return (
    <div>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow="right">Кнопка</Button>
    </div>
  );
}