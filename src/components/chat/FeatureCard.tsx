
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Feature } from "@/types/chat";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;
  
  return (
    <Card className="bg-gradient-to-br from-white/5 via-primary/5 to-white/5 border-white/10 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group">
      <CardHeader>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full transform group-hover:scale-110 transition-transform duration-300" />
          <Icon className="h-8 w-8 text-primary relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <CardTitle className="text-white mt-4 bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent">
          {feature.title}
        </CardTitle>
        <CardDescription className="text-neutral-400">{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;
