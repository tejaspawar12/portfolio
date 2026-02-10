import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import { education } from "@/content/portfolio";

export default function Education() {
  return (
    <section id="education" className="section-pad py-20">
      <SectionHeading title="Education" subtitle="Credentials" />
      <div className="grid gap-6 lg:grid-cols-2">
        {education.map((item) => (
          <Card key={item.school}>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">{item.period}</p>
            <h3 className="mt-2 text-lg font-semibold">{item.program}</h3>
            <p className="text-sm text-neon-400">{item.school}</p>
            <p className="mt-3 text-sm text-white/70">{item.details}</p>
            {item.coursework && item.coursework.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">Coursework</p>
                <ul className="flex flex-wrap gap-2">
                  {item.coursework.map((course) => (
                    <li
                      key={course}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-white/80"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
