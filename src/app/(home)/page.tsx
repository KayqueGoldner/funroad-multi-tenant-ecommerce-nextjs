import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const Home = () => {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 p-10">
      <div>
        <Button variant="elevated">Click me</Button>
      </div>
      <div>
        <Input placeholder="Input" />
      </div>
      <div>
        <Progress value={50} />
      </div>
      <div>
        <Textarea placeholder="Textarea" />
      </div>
      <div className="flex gap-2">
        <Checkbox />
        <Checkbox checked />
      </div>
    </div>
  );
};

export default Home;
