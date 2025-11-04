import { loadAllLevels } from "../lib/content";
(async ()=>{
  try{
    const packs = await loadAllLevels();
    let total=0;
    packs.forEach(p=> total += p.scenarios.length);
    console.log(`OK: Loaded ${packs.length} levels, ${total} scenarios.`);
    process.exit(0);
  }catch(e){
    console.error("Validation failed:\n", e?.issues || e);
    process.exit(1);
  }
})();

