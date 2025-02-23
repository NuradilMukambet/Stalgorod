import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const builds = [
  { id: 1, title: "Солдаты Стимпанка", description: "Битва с врагами в стиле стимпанк.", image: "/img/build1.jpg" },
  { id: 2, title: "Снайпер", description: "Мастерство стрельбы на дальние дистанции.", image: "/img/build2.jpg" },
  { id: 3, title: "Выживание в Стальгороде", description: "Мальчик пытается выжить в разрушенном городе.", image: "/img/build3.jpg" },
  { id: 4, title: "Алик и Алиса", description: "Главный герой и его спутница в мире войны.", image: "/img/build4.jpg" },
  { id: 5, title: "Агнесса", description: "Девушка, ждущая возвращения героя.", image: "/img/build5.jpg" },
  { id: 6, title: "Немецкий офицер и Жуков", description: "Два стратегических ума в противостоянии.", image: "/img/build6.jpg" }
];

export default function Builds() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {builds.map((build) => (
        <motion.div key={build.id} whileHover={{ scale: 1.05 }} className="relative">
          <Card className="overflow-hidden shadow-xl border border-gray-700 bg-gray-900 text-white">
            <img src={build.image} alt={build.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{build.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{build.description}</p>
              <Button variant="outline" className="mt-4 w-full">Подробнее</Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
