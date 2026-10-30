#!/usr/bin/env bash
# 生成 Lumière 商品/场景图片（需 mmx CLI 已登录）
set -e
cd "$(cd "$(dirname "$0")/.." && pwd)/public/images/raw"
STYLE="shot on soft diffused studio light, cream white pale pink lilac and haze blue pastel palette, pastel gradient backdrop, airy high-key lighting, soft shadows, delicate specular highlights, ultra clean minimalist high-end commercial photography, apple aesthetic, 8k, no text, no watermark, no logo, no people faces"

gen() {
  local name="$1" prompt="$2" w="$3" h="$4"
  if [ -f "out/${name}_001.jpg" ]; then echo "skip $name"; return; fi
  mmx image generate --prompt "${prompt} ${STYLE}" --width "$w" --height "$h" \
    --out-dir ./out --out-prefix "$name" --quiet >/dev/null 2>&1 \
    && echo "ok $name" || echo "FAIL $name"
}

gen l-city "Editorial lifestyle photo, walking down a pastel city street with a small crossbody bag and wireless earbuds, dreamy soft focus, cream and lilac" 1024 680 &
gen l-efficient "Editorial lifestyle photo, tidy minimal desk with laptop, small plant and white earbuds, bright natural light, cream and haze blue" 1024 680 &
gen l-wellness "Editorial lifestyle photo, calm wellness moment, folded yoga mat and smart watch on a pastel bench, warm soft light, blush pink and cream" 1024 680 &
gen p-band "Slim minimalist smart band, pearl white and champagne gold, curved floating product shot on pastel gradient" 1024 1024 &
gen p-projector "Compact cylindrical portable projector in cream white with champagne ring, glowing soft light, minimal product photography" 1024 1024 &
gen p-neckphone "Neckband wireless earphones in pearl white and champagne, minimal floating product shot on soft pastel gradient" 1024 1024 &
wait
gen promo "Gift set arrangement of premium tech accessories, pearl white earbuds, champagne watch, cream speaker and pastel packaging boxes, elegantly grouped, studio lighting" 1536 768
echo "BATCH2 DONE"
ls -la out/
