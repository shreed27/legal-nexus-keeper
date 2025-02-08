
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Feature } from "@/types/chat";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;
  
  return (
    <Card className="bg-[#282c34]/80 border-white/10 hover:scale-105 transition-transform duration-200">
      <CardHeader>
        <Icon className="h-8 w-8 text-primary mb-2" />
        <CardTitle className="text-white">{feature.title}</CardTitle>
        <CardDescription className="text-neutral-400">{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;
