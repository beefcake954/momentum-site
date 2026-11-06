import Reveal from "./ui/Reveal";
import HoloBoat from "./graphics/HoloBoat";

export default function Marine() {
  return (
    <section id="marine" className="relative overflow-hidden border-t border-[var(--color-line)] py-20 md:py-32">
      <div className="wrap">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p className="label text-teal">The specialty</p>
            <h2 className="h-display mt-6 text-[clamp(2.6rem,6vw,5rem)] text-abalone">
              Marine is our specialty. Not the whole company.
            </h2>
          </div>
          <div className="body-lg max-w-[34rem] text-[var(--color-mute)] lg:col-span-4 lg:col-start-9 lg:self-end">
            <p>
              Boats are the niche we know best. The Boat Kings — a partner, on
              a high-volume floor in Pompano. Boat World USA — over 40 years in
              business, and we are installing the same class of system. Marine
              is a specialty because that is where the product was proven. Not
              because we only serve boats.
            </p>
          </div>
        </Reveal>

        <HoloBoat className="-mx-2 mt-16 md:mx-0 md:mt-24" />
      </div>
    </section>
  );
}
