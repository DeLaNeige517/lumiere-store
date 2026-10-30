#!/usr/bin/env bash
# 生成 Lumière 商品/场景图片（需 mmx CLI 已登录）
set -e
cd "$(cd "$(dirname "$0")/.." && pwd)/public/images/raw"
mkdir -p out
STYLE="shot on soft diffused studio light, cream white pale pink lilac and haze blue pastel palette, pastel gradient backdrop, airy high-key lighting, soft shadows, delicate specular highlights, ultra clean minimalist high-end commercial photography, apple aesthetic, 8k, no text, no watermark, no logo, no people faces"

gen() {
  local name="$1" prompt="$2" w="$3" h="$4"
  if [ -f "out/${name}_001.jpg" ]; then echo "skip $name"; return; fi
  mmx image generate --prompt "${prompt} ${STYLE}" --width "$w" --height "$h" \
    --out-dir ./out --out-prefix "$name" --quiet >/dev/null 2>&1 \
    && echo "ok $name" || echo "FAIL $name"
}

# ---- products (1:1) ----
gen p-earbuds "Pearl white wireless earbuds in matte cream charging case, floating slightly above a glossy cream pedestal, soft pink glow" 1024 1024 &
gen p-watch "Elegant smartwatch with champagne gold case and cream silicone band, floating on soft gradient, minimal dial" 1024 1024 &
gen p-speaker "Minimal cylindrical smart home speaker wrapped in cream fabric with champagne top, soft haze blue light" 1024 1024 &
gen p-charger "Slim magnetic wireless charging pad and compact pastel power bank, pearl white, floating minimal composition" 1024 1024 &
gen p-headphone "Premium over-ear headphones in soft cloud white with champagne metal accents, minimal product studio shot" 1024 1024 &
gen p-lamp "Smart table lamp with frosted glass dome glowing warm, haze blue ceramic base, minimal pastel product photography" 1024 1024 &
wait

# ---- hero (wide) ----
gen hero "Hero product: pearl white wireless earbuds with open charging case, large soft spotlight, pastel cream pink and lilac background, generous empty space on the left, dreamy bokeh glow" 1536 1152 &

# ---- collection scenes (4:3) ----
gen c-travel "Lifestyle scene, young woman walking through a bright minimal city street at golden hour wearing earbuds, cream coat, soft pink and blue tones, airy, film photography" 1024 768 &
gen c-quiet "Lifestyle scene, quiet morning ritual, a ceramic cup of coffee on a linen table beside white earbuds, soft window light, cream and beige pastel" 1024 768 &
gen c-health "Lifestyle scene, close up of wrist wearing a champagne smartwatch during a morning run in a pastel park, soft sunlight, blue and cream tones" 1024 768 &
gen c-home "Lifestyle scene, serene minimalist living room with cream sofa, glowing smart lamp, pastel lilac and pink ambient light, architectural interior" 1024 768 &
wait

# ---- lifestyle articles (3:2) ----
gen l-city "Editorial lifestyle photo, walking down a pastel city street with a small crossbody bag and wireless earbuds, dreamy soft focus, cream and lilac" 1024 683 &
gen l-efficient "Editorial lifestyle photo, tidy minimal desk with laptop, small plant and white earbuds, bright natural light, cream and haze blue" 1024 683 &
gen l-wellness "Editorial lifestyle photo, calm wellness moment, folded yoga mat and smart watch on a pastel bench, warm soft light, blush pink and cream" 1024 683 &
gen promo "Gift set arrangement of premium tech accessories, pearl white earbuds, champagne watch, cream speaker and pastel packaging boxes, elegantly grouped, studio lighting" 1536 768 &
wait
echo "ALL DONE"
ls -la out/
