# Barbearia DUB — Arquitetura Espacial & Modelo Atômico 3D

Visualizador interativo de alta precisão em formato de **Átomo 3D (Modelo Rutherford-Bohr Espacial)**, mapeando todos os componentes, órbitas eletrônicas, banco de dados e integrações da **Barbearia DUB**.

---

## Métricas do Átomo

- **218 Partículas & Componentes Mapeados**
- **573 Conexões & Dependências Quânticas Ativas**
- **92 Prótons no Banco de Dados (PostgreSQL + RLS)**
- **50 Elétrons na Nuvem Serverless (Supabase Edge Functions)**
- **19 Telas e Rotas Operacionais**
- **8 Gateways e APIs Externas Integradas**
- **11 Hooks Customizados de Estado Reativo**

---

## Controles e Navegação Espacial 3D

- 🔄 **Orbitar 360°**: Arraste com o Botão Esquerdo do Mouse para girar o átomo livremente em 3 dimensões (Yaw e Pitch).
- ✋ **Mover (Pan 3D)**: Arraste com o Botão Direito do Mouse (ou segure `Shift` + Botão Esquerdo) para transladar a câmera no plano de visualização.
- 🔍 **Zoom Espacial**: Use a roda do mouse (scroll) ou os botões `+` e `-` para aproximar ou afastar a visualização.
- 🎯 **Focar & Inspecionar Nó**: Clique simples em qualquer partícula para focar a câmera nela e abrir o painel lateral com detalhes técnicos.
- ↩️ **Deseleção Inteligente (Toggle)**: Clicar novamente no mesmo nó ou no botão `✕` (ou `Esc`) desmarca o componente e recentraliza o átomo em 3D.
- 🧭 **Giroscópio 3D (Minimap)**: Radar no canto inferior direito que espelha em tempo real a rotação do átomo com os eixos espaciais X, Y e Z.
- ⚡ **Fluxos Críticos de Negócio**: Botões no canto inferior esquerdo para iluminar transações ponta a ponta (Agendamento & Pix, Saque Barbeiro, IA BIA, WhatsApp, Backend).
- 🔎 **Busca Instantânea (`Ctrl + K`)**: Localizador com foco automático em 3D no componente selecionado.

---

## Estrutura das Camadas e Órbitas 3D

1. **Núcleo Central Atômico (0, 0, 0)**:
   - Emblema Barbearia DUB e Core Engine central.
   - Envolto por anéis de confinamento eletromagnético em carmim (`#e03115`) e ouro nobre (`#d4af37`).

2. **Órbitas Elípticas Rutherfordianas em 3D**:
   - **Órbita Alpha (Inclinada a +35° / 45°)**: Gestão & Dono, Landing Page e Assinaturas (34 partículas).
   - **Órbita Beta (Inclinada a -35° / -45°)**: Operação Barbeiro, Experiência do Cliente, Hooks e Loja (26 partículas).
   - **Órbita Gamma (Plano Vertical a 90°)**: Motor Pix & Finanças, WhatsApp, IA BIA e APIs Externas (13 partículas).

3. **Camadas de Valência**:
   - **Camada Quântica K (Torus Ondulado, $R = 1600\text{px}$)**: 50 Supabase Edge Functions.
   - **Nuvem de Valência L (Esfera de Fibonacci, $R = 2200\text{px}$)**: 92 Tabelas PostgreSQL distribuídas homogeneamente pela superfície da esfera sem colisão.

---

## Design & Engenharia de UX

- **Tipografia Mais Grossa e Marcante**: Fontes em pesos 700, 800 e 900 (`Plus Jakarta Sans`), com etiquetas em pílulas escuras de alto contraste.
- **Movimento Direto Sem Balanço (Zero Wobble)**: Interpolação assintótica crítica com amortecimento perfeito — sem qualquer efeito elástico ou oscilação.
- **Motor Gráfico Zero-Dependency**: Renderização 3D pura sobre Canvas 2D nativo — sem bibliotecas externas pesadas, carregamento instantâneo a 60 FPS e compatibilidade total offline via `file:///`.
