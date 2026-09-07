import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConditionBadge } from './ConditionBadge';
import { PriceTag } from './PriceTag';

describe('ConditionBadge', () => {
  it('muestra el estado y el grado', () => {
    render(<ConditionBadge condition="Excelente" grade={8} />);
    expect(screen.getByText(/Excelente/)).toBeInTheDocument();
    expect(screen.getByText(/8\/10/)).toBeInTheDocument();
  });
});

describe('PriceTag', () => {
  it('muestra "Consultar" cuando no hay precio', () => {
    render(<PriceTag value={null} />);
    expect(screen.getByText('Consultar')).toBeInTheDocument();
  });

  it('formatea el precio cuando hay número', () => {
    render(<PriceTag value={2500} />);
    expect(screen.getByText(/2\.500/)).toBeInTheDocument();
  });
});
