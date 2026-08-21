export function initExpertiseGraph() {
  const root = document.querySelector<SVGSVGElement>('[data-graph]');
  const detailLabel = document.querySelector<HTMLElement>('[data-graph-detail-label]');
  const detailBody = document.querySelector<HTMLElement>('[data-graph-detail-body]');
  if (!root || !detailLabel || !detailBody) return;

  const nodes = Array.from(root.querySelectorAll<SVGGElement>('[data-node]'));
  const edges = Array.from(root.querySelectorAll<SVGLineElement>('[data-edge]'));

  const setDetail = (label: string, body: string) => {
    detailLabel.textContent = label;
    detailBody.textContent = body;
  };

  const defaultLabel = detailLabel.textContent ?? '';
  const defaultBody = detailBody.textContent ?? '';

  const clear = () => {
    nodes.forEach((node) => node.classList.remove('is-active', 'is-dim'));
    edges.forEach((edge) => edge.classList.remove('is-active', 'is-dim'));
    setDetail(defaultLabel, defaultBody);
  };

  const activate = (node: SVGGElement) => {
    const id = node.dataset.node;
    const links = new Set((node.dataset.links ?? '').split(',').filter(Boolean));
    links.add(id ?? '');

    nodes.forEach((other) => {
      const isLinked = other.dataset.node ? links.has(other.dataset.node) : false;
      other.classList.toggle('is-active', isLinked);
      other.classList.toggle('is-dim', !isLinked);
    });

    edges.forEach((edge) => {
      const touches = edge.dataset.from === id || edge.dataset.to === id;
      edge.classList.toggle('is-active', touches);
      edge.classList.toggle('is-dim', !touches);
    });

    setDetail(node.dataset.label ?? '', node.dataset.detail ?? '');
  };

  nodes.forEach((node) => {
    node.addEventListener('pointerenter', () => activate(node));
    node.addEventListener('focus', () => activate(node));
    node.addEventListener('pointerleave', clear);
    node.addEventListener('blur', clear);
    node.addEventListener('click', (event) => {
      event.preventDefault();
      activate(node);
    });
  });

  root.addEventListener('pointerleave', clear);
}
