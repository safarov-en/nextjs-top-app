import { Button } from "@/components/Button/Button";
import { Htag } from "@/components/Htag/Htag";
import { Rating } from "@/components/Rating/Rating";
import { Tag } from "@/components/Tag/Tag";

export default function Home() {
  return (
    <div>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow="right">Кнопка</Button>
      <Tag size="s">Ghost</Tag>
      <Tag size="m" color="red">Red</Tag>
      <Tag size="s" color="green">Green</Tag>
      <Tag color="primary">Green</Tag>
      <Rating rating={4} />
    </div>
  );
}