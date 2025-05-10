import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, LineChart, Line } from "recharts";
import TrafficLight from "@/components/TrafficLight";

interface AlzheimerModelResult {
  diagnosis: "Alzheimer" | "No Alzheimer";
  probability: number;
  risk_level: "Bajo" | "Moderado" | "Alto";
}

interface CognitiveDomain {
  name: string;
  score: number;
  status: "green" | "yellow" | "red";
}

interface CognitiveTestResult {
  overallScore: number;
  responseTime: number;
  domains: CognitiveDomain[];
  timeData: { timepoint: string; value: number }[];
}

interface CombinedTestResults {
  cognitive?: CognitiveTestResult;
  alzheimer?: AlzheimerModelResult;
}

interface CognitiveResultsDashboardProps {
  results: CombinedTestResults;
}

const CognitiveResultsDashboard = ({ results }: CognitiveResultsDashboardProps) => {
  const config = {
    red: { label: "Preocupante", theme: { light: "#FF6B6B", dark: "#FF6B6B" } },
    yellow: { label: "Vigilancia", theme: { light: "#FFD166", dark: "#FFD166" } },
    green: { label: "Normal", theme: { light: "#06D6A0", dark: "#06D6A0" } },
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return "Normal";
    if (score >= 60) return "Vigilancia";
    return "Preocupante";
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "bg-neuro-green";
    if (score >= 60) return "bg-neuro-yellow";
    return "bg-neuro-red";
  };

  const { cognitive, alzheimer } = results;

  return (
    <div className="space-y-6">
      {cognitive && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Puntuación general</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{cognitive.overallScore}%</span>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="10" strokeOpacity="0.1" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        stroke={getRiskColor(cognitive.overallScore)}
                        strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 45 * cognitive.overallScore / 100} ${2 * Math.PI * 45 * (100 - cognitive.overallScore) / 100}`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-center mt-2">
                  Nivel de riesgo: <span className={`font-medium ${getRiskColor(cognitive.overallScore).replace('bg-', 'text-')}`}>
                    {getRiskLevel(cognitive.overallScore)}
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Tiempo de respuesta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[150px]">
                  <ChartContainer config={config} className="h-full w-full">
                    <LineChart data={cognitive.timeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis dataKey="timepoint" fontSize={12} />
                      <YAxis fontSize={12} />
                      <ChartTooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Tiempo</span>
                                  <span className="font-bold text-muted-foreground">{payload[0].payload.timepoint}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Valor</span>
                                  <span className="font-bold">{payload[0].value}s</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Line type="monotone" dataKey="value" stroke="#87BBA2" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6, fill: "#5D737E" }} />
                    </LineChart>
                  </ChartContainer>
                </div>
                <p className="text-center mt-2">Tiempo promedio: {cognitive.responseTime}s</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Resultados por dominio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cognitive.domains.map((domain, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <TrafficLight status={domain.status} size="sm" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{domain.name}</span>
                          <span className="text-sm font-medium">{domain.score}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${domain.status === "green" ? "bg-neuro-green" : domain.status === "yellow" ? "bg-neuro-yellow" : "bg-neuro-red"}`} style={{ width: `${domain.score}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Rendimiento por categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ChartContainer config={config} className="h-full w-full">
                  <BarChart data={cognitive.domains} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis domain={[0, 100]} fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="var(--color-green)" background={{ fill: "var(--color-muted)" }} maxBarSize={50} />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {alzheimer && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Resultado Alzheimer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <p><strong>Diagnóstico:</strong> {alzheimer.diagnosis}</p>
              <p><strong>Probabilidad:</strong> {alzheimer.probability}%</p>
              <p><strong>Nivel de riesgo:</strong> {alzheimer.risk_level}</p>
              <TrafficLight
                status={
                  alzheimer.risk_level === "Alto"
                    ? "red"
                    : alzheimer.risk_level === "Moderado"
                    ? "yellow"
                    : "green"
                }
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CognitiveResultsDashboard;