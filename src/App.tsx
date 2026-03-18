import { motion } from 'motion/react';
import { Heart, PawPrint, Star, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// --- Background Animations ---
const FloatingElement = ({ delay, duration, x, size, Icon, color }: any) => (
  <motion.div
    className={`absolute bottom-[-50px] ${color} opacity-40`}
    initial={{ y: 0, x: `${x}vw`, scale: 0, rotate: 0 }}
    animate={{ 
      y: '-120vh', 
      x: `${x + (Math.random() * 10 - 5)}vw`,
      scale: size,
      rotate: 360 
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay,
      ease: "linear" 
    }}
  >
    <Icon fill="currentColor" size={24} />
  </motion.div>
);

const Background = () => {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 30 }).map((_, i) => {
      const isStar = Math.random() > 0.7;
      const isPaw = Math.random() > 0.85;
      return {
        id: i,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 20,
        x: Math.random() * 100,
        size: 0.5 + Math.random() * 1.5,
        Icon: isPaw ? PawPrint : (isStar ? Star : Heart),
        color: isPaw ? 'text-orange-300' : (isStar ? 'text-yellow-200' : 'text-pink-300')
      };
    });
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map(el => <FloatingElement key={el.id} {...el} />)}
    </div>
  );
};

// --- Reusable Section Component ---
const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.section 
    id={id}
    className={`min-h-screen flex flex-col items-center justify-center py-20 px-6 relative z-10 ${className}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.section>
);

const NextButton = ({ targetId, text = "Дальше" }: { targetId: string, text?: string }) => {
  const scrollTo = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollTo}
      className="mt-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
      <ChevronDown className="group-hover:translate-y-1 transition-transform" />
    </motion.button>
  );
};

const Title = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h2 
    className={`text-4xl md:text-6xl font-bold text-pink-600 mb-8 text-center leading-tight ${className}`}
    style={{ fontFamily: "'Pacifico', cursive, sans-serif" }}
  >
    {children}
  </h2>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-xl p-8 md:p-12 border-2 border-pink-100 ${className}`}>
    {children}
  </div>
);

export default function App() {
  return (
    <div className="bg-pink-50 text-gray-700 font-sans selection:bg-pink-200 overflow-x-hidden">
      <Background />

      {/* 1. Hero Block */}
      <section id="section-1" className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center shadow-inner mx-auto relative">
            <Heart className="text-pink-500 absolute" fill="currentColor" size={64} />
            <Sparkles className="text-yellow-400 absolute -top-2 -right-2" size={32} />
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-pink-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: "'Pacifico', cursive, sans-serif" }}
        >
          Любимая Маришка!
        </motion.h1>

        <motion.p 
          className="text-2xl md:text-3xl font-medium text-gray-800 mb-4 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Я хочу сказать тебе, как сильно я тебя люблю.<br/>
          Моя любовь к тебе безгранична! ❤️
        </motion.p>

        <motion.p 
          className="text-lg md:text-xl text-gray-500 mb-12 max-w-xl italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Этот сайт — маленькое напоминание о том, какая ты для меня важная, любимая и самая родная.
        </motion.p>

        <NextButton targetId="section-2" text="Читать дальше, любовь моя" />

        <motion.p 
          className="absolute bottom-8 text-sm text-pink-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          С любовью, только для тебя ✨
        </motion.p>
      </section>

      {/* 2. Как сильно я тебя люблю */}
      <Section id="section-2">
        <Card className="max-w-3xl w-full text-center">
          <Title>Как сильно?</Title>
          <div className="space-y-6 text-xl md:text-2xl leading-relaxed">
            <p className="font-medium text-pink-500">Очень сильно. Даже сильнее, чем можно описать словами.</p>
            <p>Я люблю твою улыбку.<br/>
            Люблю твой голос.<br/>
            Люблю, как ты смеешься.<br/>
            Люблю, как рядом с тобой любой день становится теплее, спокойнее и счастливее.</p>
            <p>С тобой хочется жить, мечтать, строить планы, смеяться, обниматься и просто быть рядом.</p>
            <p className="text-2xl md:text-3xl font-medium text-pink-600 mt-8">
              Ты для меня — не просто любимый человек.<br/>
              Ты мой уют, моя радость и мое сердце. ❤️
            </p>
          </div>
        </Card>
        <NextButton targetId="section-3" />
      </Section>

      {/* 3. Шелдон */}
      <Section id="section-3">
        <div className="max-w-4xl w-full text-center">
          <Title className="text-orange-500">Я люблю тебя так же сильно, как нашего толстого рыжего кота Шелдона 🐈</Title>
          <p className="text-xl md:text-2xl mb-12">
            И даже чуточку больше…<br/>
            <span className="text-gray-500 italic text-lg">Но Шелдону мы об этом, конечно, не скажем. Пусть и дальше думает, что он самый главный любимчик в доме.</span>
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <img 
                src="/sheldon.jpg" 
                alt="Шелдон" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[3rem] border-8 border-orange-200 shadow-2xl"
                onError={(e) => {
                  // Fallback if image is not uploaded yet
                  e.currentTarget.src = "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=600&h=600";
                }}
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
                <PawPrint className="text-orange-400" size={32} />
              </div>
            </motion.div>

            <Card className="text-left border-orange-100 bg-orange-50/50">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">Толстый рыжий кот Шелдон</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-orange-400" size={20}/> эксперт по сну</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-orange-400" size={20}/> мастер по важному лежанию</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-orange-400" size={20}/> пушистый начальник квартиры</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-orange-400" size={20}/> свидетель нашей любви</li>
              </ul>
              <p className="mt-6 text-sm text-gray-500 italic">
                Шелдон бы точно одобрил этот сайт. Наверное. Если бы не спал.
              </p>
            </Card>
          </div>
        </div>
        <NextButton targetId="section-4" />
      </Section>

      {/* 4. Мотя */}
      <Section id="section-4">
        <Card className="max-w-3xl w-full text-center border-amber-100 bg-amber-50/30">
          <Title className="text-amber-600 mb-6">И, конечно же, я люблю тебя так же сильно, как нашу маленькую Матильду 🐹</Title>
          <div className="space-y-6 text-xl">
            <p>Нашу милую Мотю.<br/>
            Такую маленькую, очаровательную и любимую.</p>
            <p>Но даже рядом с ней ты все равно остаешься самым драгоценным чудом в моей жизни.</p>
            
            <div className="bg-white/60 p-6 rounded-3xl mt-8 inline-block">
              <p className="text-amber-700 font-medium mb-2">Мотя — символ нежности и уюта 🐾</p>
              <p className="text-pink-600 font-bold text-2xl">А ты для меня — символ счастья, любви и дома. 🏡</p>
            </div>
          </div>
        </Card>
        <NextButton targetId="section-5" />
      </Section>

      {/* 5. Почему именно ты */}
      <Section id="section-5">
        <div className="max-w-5xl w-full">
          <Title>Почему я люблю тебя</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Ты делаешь мир теплее", text: "С тобой даже обычные дни становятся особенными." },
              { title: "Ты невероятно красивая", text: "Для меня ты самая нежная, милая и прекрасная." },
              { title: "С тобой спокойно", text: "Рядом с тобой я чувствую себя дома." },
              { title: "С тобой весело", text: "Ты умеешь делать жизнь ярче и счастливее." },
              { title: "Ты — моя любимая", text: "И этим сказано вообще все.", colSpan: "md:col-span-2 lg:col-span-1" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-pink-100 hover:shadow-xl transition-shadow ${item.colSpan || ''}`}
                whileHover={{ y: -5 }}
              >
                <Heart className="text-pink-400 mb-4" size={32} />
                <h3 className="text-xl font-bold text-pink-600 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <NextButton targetId="section-6" />
      </Section>

      {/* 6. Наш маленький мир */}
      <Section id="section-6">
        <Card className="max-w-3xl w-full text-center">
          <Title>Наш маленький мир</Title>
          <div className="space-y-6 text-xl leading-relaxed">
            <p>У нас есть свой особенный мир.</p>
            <p>В нем есть ты.<br/>
            Есть я.<br/>
            Есть Шелдон, который считает себя центром вселенной.<br/>
            Есть Мотя, которая делает этот мир еще милее.</p>
            <p>Есть наши разговоры, наши шутки, наши объятия, наши вечера и наши маленькие счастливые моменты.</p>
            <p className="text-2xl font-bold text-pink-500 mt-8">
              И я очень люблю этот мир.<br/>
              Потому что в нем есть ты. ✨
            </p>
          </div>
        </Card>
        <NextButton targetId="section-7" />
      </Section>

      {/* 7. Моменты */}
      <Section id="section-7">
        <div className="max-w-3xl w-full">
          <Title>Что я особенно люблю</Title>
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-xl p-8 md:p-12 border-2 border-pink-100 mt-8">
            <ul className="space-y-4 text-xl md:text-2xl">
              {[
                "твои сонные утренние глаза",
                "твой смех",
                "наши объятия",
                "наши разговоры ни о чем и обо всем",
                "моменты, когда мы просто рядом",
                "как ты заботишься",
                "как ты смотришь на меня",
                "как рядом с тобой все становится лучше"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Sparkles className="text-pink-400 shrink-0" size={24} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 pt-6 border-t border-pink-100 text-center">
              <p className="text-xl text-gray-500 italic">На самом деле список бесконечный.</p>
              <p className="text-2xl font-bold text-pink-600 mt-2">Потому что я люблю в тебе все.</p>
            </div>
          </div>
        </div>
        <NextButton targetId="section-8" />
      </Section>

      {/* 8. Обещания */}
      <Section id="section-8">
        <Card className="max-w-3xl w-full text-center bg-gradient-to-br from-white/90 to-pink-50/90">
          <Title>Что я хочу тебе пообещать</Title>
          <div className="space-y-6 text-xl md:text-2xl leading-relaxed">
            <p>Я обещаю любить тебя нежно и искренне.</p>
            <p>Обещаю быть рядом в хорошие дни и в трудные моменты.</p>
            <p>Обещаю обнимать крепко, смешить, поддерживать и беречь тебя.</p>
            <p>Обещаю снова и снова напоминать тебе, какая ты замечательная.</p>
            <p className="text-3xl font-bold text-pink-600 mt-8">
              И обещаю любить тебя еще сильнее с каждым днем. ❤️
            </p>
          </div>
        </Card>
        <NextButton targetId="section-9" />
      </Section>

      {/* 9. Факты */}
      <Section id="section-9">
        <div className="max-w-4xl w-full text-center">
          <Title>Несколько важных фактов</Title>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {[
              "Маришка — самая любимая девочка на свете 👑",
              "Алексей любит Маришку очень-очень сильно 💖",
              "Шелдон — толстый рыжий кот 🐈",
              "Мотя — маленькая милая звезда 🐹",
              "Вместе вы — самая уютная команда ☕",
              "Этот сайт создан с любовью и нежностью 💌"
            ].map((fact, i) => (
              <motion.div
                key={i}
                className="bg-white px-6 py-4 rounded-full shadow-md border border-pink-100 text-lg md:text-xl font-medium text-gray-700"
                whileHover={{ scale: 1.05, backgroundColor: "#fdf2f8" }}
              >
                {fact}
              </motion.div>
            ))}
          </div>
        </div>
        <NextButton targetId="section-10" />
      </Section>

      {/* 10. Если бы любовь была */}
      <Section id="section-10">
        <Card className="max-w-3xl w-full text-center">
          <Title>Если бы моя любовь к тебе была…</Title>
          <div className="space-y-6 text-xl md:text-2xl leading-relaxed italic text-gray-600">
            <p>Если бы моя любовь к тебе была небом — она была бы бесконечной ☁️</p>
            <p>Если бы она была морем — у нее не было бы берегов 🌊</p>
            <p>Если бы она была светом — она согревала бы тебя всегда ✨</p>
            <p>Если бы она была домом — в нем было бы уютно, спокойно и хорошо 🏡</p>
            
            <div className="not-italic mt-10 pt-8 border-t border-pink-100">
              <p className="text-2xl font-medium text-gray-800">Но моя любовь — это просто я.</p>
              <p className="text-3xl font-bold text-pink-600 mt-2">И я люблю тебя всем сердцем.</p>
            </div>
          </div>
        </Card>
        <NextButton targetId="section-11" />
      </Section>

      {/* 11. Финал */}
      <Section id="section-11" className="pb-32">
        <motion.div 
          className="max-w-2xl w-full text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-2xl md:text-3xl space-y-6 leading-relaxed text-gray-800">
            <p>Любимая Маришка,<br/>спасибо тебе за то, что ты есть.</p>
            <p>За твою нежность, тепло, красоту и любовь.<br/>
            За все моменты рядом.<br/>
            За наш маленький мир.</p>
            
            <div className="my-12">
              <Heart className="mx-auto text-pink-500 animate-pulse" fill="currentColor" size={80} />
            </div>

            <p className="font-bold text-pink-600 text-3xl md:text-4xl">
              Я очень тебя люблю.<br/>
              Очень-очень.<br/>
              Сильнее слов.<br/>
              Сильнее времени.<br/>
              Сильнее всего. ❤️
            </p>

            <p className="text-4xl md:text-6xl text-pink-500 mt-16" style={{ fontFamily: "'Pacifico', cursive, sans-serif" }}>
              Твой Алексей
            </p>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
